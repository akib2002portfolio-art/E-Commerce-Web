import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";

import { ImageUpload } from "@/features/admin/shared/components/ImageUpload";
import type {
    CreateProductInput,
    Product,
    ProductStatus,
} from "../types/product";

interface ProductFormProps {
    mode: "create" | "edit";

    initialData?: Product;

    onSubmit: (
        product: CreateProductInput,
    ) => Promise<void>;
}

interface FormErrors {
    name: string;
    sku: string;
    category: string;
    price: string;
    stock: string;
}

export function ProductForm({
    mode,
    initialData,
    onSubmit,
}: ProductFormProps) {
    const navigate = useNavigate();

    const [name, setName] = useState(initialData?.name ?? "");
    const [sku, setSku] = useState(initialData?.sku ?? "");
    const [category, setCategory] = useState(initialData?.category ?? "");
    const [price, setPrice] = useState(
        initialData ? String(initialData.price) : "",
    );
    const [stock, setStock] = useState(
        initialData ? String(initialData.stock) : "",
    );
    const [description, setDescription] = useState(
        initialData?.description ?? "",
    );
    const [imageUrl, setImageUrl] = useState<string | null>(
        initialData?.image_url ?? null,
    );
    const [status, setStatus] = useState<ProductStatus>(
        initialData?.status ?? "draft",
    );

    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState<FormErrors>({
        name: "",
        sku: "",
        category: "",
        price: "",
        stock: "",
    });

    // Keep the form in sync if initialData arrives/changes after mount
    // (e.g. the product finishes loading after the form has mounted).
    useEffect(() => {
        if (!initialData) return;

        setName(initialData.name);
        setSku(initialData.sku);
        setCategory(initialData.category);
        setPrice(String(initialData.price));
        setStock(String(initialData.stock));
        setDescription(initialData.description);
        setImageUrl(initialData.image_url);
        setStatus(initialData.status);
    }, [initialData]);

    function validate() {
        const newErrors: FormErrors = {
            name: "",
            sku: "",
            category: "",
            price: "",
            stock: "",
        };

        let valid = true;

        if (!name.trim()) {
            newErrors.name = "Product name is required.";
            valid = false;
        }

        if (!sku.trim()) {
            newErrors.sku = "SKU is required.";
            valid = false;
        }

        if (!category) {
            newErrors.category = "Please select a category.";
            valid = false;
        }

        if (!price || Number(price) <= 0) {
            newErrors.price = "Price must be greater than 0.";
            valid = false;
        }

        if (stock === "" || Number(stock) < 0) {
            newErrors.stock = "Stock cannot be negative.";
            valid = false;
        }

        setErrors(newErrors);

        return valid;
    }

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>,
    ) {
        e.preventDefault();

        if (!validate()) return;

        setLoading(true);

        try {
            await onSubmit({
                name,
                sku,
                category,
                price: Number(price),
                stock: Number(stock),
                description,
                status: status as ProductStatus,
                image_url: imageUrl,
            });

            if (mode === "create") {
                setName("");
                setSku("");
                setCategory("");
                setPrice("");
                setStock("");
                setDescription("");
                setStatus("draft");
                setImageUrl(null);
            }
        } catch (error) {
            console.error(error);

            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert("Failed to save product.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >
            <div className="grid gap-6 md:grid-cols-2">

                {/* Product Name */}

                <div>
                    <label className="eyebrow">
                        Product Name
                    </label>

                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-2 w-full rounded-md border border-hairline p-3"
                    />

                    {errors.name && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.name}
                        </p>
                    )}
                </div>

                {/* SKU */}

                <div>
                    <label className="eyebrow">
                        SKU
                    </label>

                    <input
                        value={sku}
                        onChange={(e) => setSku(e.target.value)}
                        className="mt-2 w-full rounded-md border border-hairline p-3"
                    />

                    {errors.sku && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.sku}
                        </p>
                    )}
                </div>

                {/* Category */}

                <div>
                    <label className="eyebrow">
                        Category
                    </label>

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="mt-2 w-full rounded-md border border-hairline p-3"
                    >
                        <option value="">Select Category</option>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                        <option value="Accessories">Accessories</option>
                    </select>

                    {errors.category && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.category}
                        </p>
                    )}
                </div>

                {/* Price */}

                <div>
                    <label className="eyebrow">
                        Price
                    </label>

                    <input
                        type="number"
                        min="0"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="mt-2 w-full rounded-md border border-hairline p-3"
                    />

                    {errors.price && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.price}
                        </p>
                    )}
                </div>

                {/* Stock */}

                <div>
                    <label className="eyebrow">
                        Stock
                    </label>

                    <input
                        type="number"
                        min="0"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        className="mt-2 w-full rounded-md border border-hairline p-3"
                    />

                    {errors.stock && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.stock}
                        </p>
                    )}
                </div>

                {/* Status */}

                <div>
                    <label className="eyebrow">
                        Status
                    </label>

                    <select
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value as ProductStatus)
                        }
                        className="mt-2 w-full rounded-md border border-hairline p-3"
                    >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="out_of_stock">Out of Stock</option>
                    </select>
                </div>

            </div>

            {/* Product Image */}

            <div>
                <label className="eyebrow">
                    Product Image
                </label>

                <div className="mt-2">
                    <ImageUpload
                        value={imageUrl}
                        onChange={setImageUrl}
                    />
                </div>
            </div>

            {/* Description */}

            <div>
                <label className="eyebrow">
                    Description
                </label>

                <textarea
                    rows={6}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-2 w-full rounded-md border border-hairline p-3"
                />
            </div>

            {/* Buttons */}

            <div className="flex justify-end gap-3">

                <button
                    type="button"
                    onClick={() =>
                        navigate({
                            to: "/admin/products",
                        })
                    }
                    className="rounded-md border border-hairline px-5 py-3 transition hover:bg-bone"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-md bg-ink px-5 py-3 text-canvas transition hover:bg-sienna disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading
                        ? "Saving..."
                        : mode === "create"
                            ? "Create Product"
                            : "Save Changes"}
                </button>

            </div>
        </form>
    );
}