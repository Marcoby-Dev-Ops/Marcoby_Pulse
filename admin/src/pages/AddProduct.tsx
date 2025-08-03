import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Loader, PlusCircle } from "lucide-react";
import { Textarea } from "../components/ui/textarea";

type ProductType = "HOSTING" | "DOMAIN" | "HARDWARE" | "SOFTWARE";

type Hosting = "Shared-Hosting" | "Semi-Dedicated" | "OpenVZ-VPS" | "KVM-VPS" | "Dedicated-Server";

const AddProduct = () => {
	const [isLoading, setIsLoading] = React.useState(false);
	const [formData, setFormData] = React.useState({
		name: "",
		description: "",
		price: "",
		currency: "",
		stock: 0,
		weight: "",
		metaTitle: "",
		metadescription: "",
		metaKeyword: "",
		images: [],
		category: "",
		productType: "HOSTING",
		productFeatures: [
			{
				name: "",
				features: Array(5).fill(""),
			},
		],
		variants: [],
	});

	const handleChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleFeatureTypeNameChange = (index: number, value: string) => {
		setFormData((prev) => {
			const copy = { ...prev };
			copy.productFeatures = [...copy.productFeatures];
			copy.productFeatures[index].name = value;
			return copy;
		});
	};

	// ------------ Function to render dynamic input fields

	const renderDynamicFields = () => {
		switch (formData.productType) {
			case "HOSTING":
				return (
					<div className="grid gap-2">
						<Label htmlFor="category">Product Category</Label>
						<Select value={formData.category} onValueChange={(value: Hosting) => handleChange("category", value)}>
							<SelectTrigger id="category" className="max-w-lg w-full">
								<SelectValue placeholder="Select a hosting category" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="Shared-Hosting">Shared Hosting</SelectItem>
								<SelectItem value="Semi-Dedicated">Semi Dedicated</SelectItem>
								<SelectItem value="OpenVZ-VPS">OpenVZ VPS</SelectItem>
								<SelectItem value="KVM-VPS">KVM VPS</SelectItem>
								<SelectItem value="Dedicated-Server">Dedicated Server</SelectItem>
							</SelectContent>
						</Select>
					</div>
				);
			case "HARDWARE":
				return (
					<div className="grid gap-6">
						<div className="grid gap-2">
							<Label htmlFor="stock">Stock</Label>
							<Input
								placeholder="e.g 10"
								type="number"
								value={formData.stock}
								onChange={(e) => handleChange("stock", e.target.value)}
								required
								className="max-w-lg w-full"
							/>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="weight">Weight (Kg)</Label>
							<Input
								placeholder="e.g., 20"
								type="number"
								value={formData.weight}
								onChange={(e) => handleChange("weight", e.target.value)}
								required
								className="max-w-lg w-full"
							/>
						</div>
					</div>
				);

			default:
				return null;
		}
	};

	return (
		<div className="p-5 flex flex-col gap-5">
			{/* -------- Add Product Header ------------ */}
			<div className="flex flex-col gap-4 justify-between lg:flex-row lg:items-center">
				<div>
					<h1 className="text-3xl font-bold font-Montserrat text-black/90 dark:text-offwhite/80">Add New Product</h1>
					<p className="text-lightbackground dark:text-offwhite/75 ">
						Fill in the details to add a new product to your catalog.
					</p>
				</div>
			</div>

			{/* ------------ Add Products Input Fields --------------- */}

			<Card>
				<CardHeader>
					<CardTitle>Product Information</CardTitle>
					<CardDescription>Basic details about the product.</CardDescription>
				</CardHeader>
				<CardContent>
					<form className="grid gap-6">
						<div className="grid gap-2">
							<Label htmlFor="productType">Product Type</Label>
							<Select
								value={formData.productType}
								onValueChange={(value: ProductType) => handleChange("productType", value)}>
								<SelectTrigger id="productType" className="max-w-lg w-full">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="HOSTING">Hosting</SelectItem>
									<SelectItem value="DOMAINS">Domains</SelectItem>
									<SelectItem value="HARDWARE">Hardware</SelectItem>
									<SelectItem value="SOFTWARE">Software</SelectItem>
								</SelectContent>
							</Select>
						</div>
						{/* -------- Product Name Field */}
						<div className="grid gap-2">
							<Label htmlFor="name">Product Name</Label>
							<Input
								id="name"
								placeholder="e.g., Business VPS Pro"
								value={formData.name}
								onChange={(e) => handleChange("name", e.target.value)}
								required
								className="max-w-lg w-full"
							/>
						</div>
						{/* ------- Product Description Field ----------- */}
						<div className="grid gap-2">
							<Label htmlFor="description">Product Description</Label>
							<Textarea
								id="description"
								placeholder="Description of the product . . ."
								value={formData.description}
								onChange={(e) => handleChange("description", e.target.value)}
								required
								className="max-w-lg w-full h-20"
							/>
						</div>
						{/* ----------- Product Price Field --------------- */}
						<div className="grid gap-2">
							<Label htmlFor="price">Price ($)</Label>
							<Input
								placeholder="e.g., 29.99"
								type="number"
								step="0.01"
								value={formData.price}
								onChange={(e) => handleChange("price", e.target.value)}
								required
								className="max-w-lg w-full"
							/>
						</div>
						{/* ----------- Meta Details (SEO) ------------- */}
						<div className="grid gap-2">
							<Label htmlFor="metaTitle">Meta Title (Optional)</Label>
							<Input
								placeholder="ProWeb VPS Hosting | Reliable Cloud Hosting . . ."
								type="text"
								value={formData.metaTitle}
								onChange={(e) => handleChange("metaTitle", e.target.value)}
								className="max-w-lg w-full"
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="metadescription">Meta Description (Optional)</Label>
							<Input
								placeholder="Get ProWeb VPS Hosting by ProWeb — powerful and secure virtual . . ."
								type="text"
								value={formData.metadescription}
								onChange={(e) => handleChange("metadescription", e.target.value)}
								className="max-w-lg w-full"
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="metaKeyword">Meta Keyword (Optional)</Label>
							<Input
								placeholder="ProWeb VPS Hosting, buy cloud . . ."
								type="text"
								value={formData.metaKeyword}
								onChange={(e) => handleChange("metaKeyword", e.target.value)}
								className="max-w-lg w-full"
							/>
						</div>

						{renderDynamicFields()}
						<Button type="submit" className="bg-regular max-w-lg w-full  hover:bg-regular/90" disabled={isLoading}>
							{isLoading ? (
								<Loader className="animate-spin h-6 w-6" />
							) : (
								<>
									<PlusCircle className="mr-2 h-4 w-4" /> Add Product
								</>
							)}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default AddProduct;
