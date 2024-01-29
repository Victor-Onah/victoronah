"use client";
import React, { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { ImCamera } from "react-icons/im";
import { IoClose } from "react-icons/io5";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function Page() {
	const [value, setValue] = useState("");
	const [blogTitle, setBlogTitle] = useState<string>("");
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [keywords, setKeywords] = useState<string[]>([]);
	const [featureImgURL, setFeatureImgURL] = useState<string>("");
	const [isAlert, setIsAlert] = useState<boolean>(true);
	const [alertMessage, setAlertMessage] = useState<string>("");
	const [postTags, setPostTags] = useState<string[]>([
		"Programming",
		"JavaScript",
		"HTML",
		"CSS",
		"Cryptocurrency",
		"Trading",
		"React JS",
		"Next JS",
		"Node JS",
		"Next JS",
		"Tailwind CSS",
		"Github",
		"Git",
		"Mongo DB",
		"Mongoose",
		"Express JS",
		"Business",
		"Indie hacking",
		"Coding",
	]);
	const editorConfig = {
		modules: {
			toolbar: [
				[{ header: [2, 3, 4, 5, 6] }],
				["bold", "italic", "underline", "strike", "blockquote"],
				[
					{ list: "ordered" },
					{ list: "bullet" },
					{ indent: "-1" },
					{ indent: "+1" },
				],
				["link", "image", "code-block"],
				["clean"],
			],
			history: {
				delay: 100,
				userOnly: true,
			},
		},
		formats: [
			"header",
			"bold",
			"italic",
			"underline",
			"strike",
			"blockquote",
			"list",
			"bullet",
			"indent",
			"link",
			"image",
			"code-block",
		],
	};

	// Function declarations

	function toggleTag(value: string): void {
		const presentValueIndex = selectedTags.findIndex(
			(tag) => tag.trim().toLowerCase() === value.trim().toLowerCase()
		);
		if (presentValueIndex !== -1) {
			setSelectedTags((prev) => {
				const newArr = [...prev];
				newArr.splice(presentValueIndex, 1);
				return newArr;
			});
		} else setSelectedTags([...selectedTags, value]);
	}
	function addKeyword(value: string): void {
		const presentValueIndex = keywords.findIndex(
			(keyword) => keyword.trim().toLowerCase() === value.trim().toLowerCase()
		);
		if (presentValueIndex !== -1) return;
		else setKeywords([...keywords, value]);
	}
	function removeKeyword(value: string) {
		const presentValueIndex = keywords.findIndex(
			(keyword) => keyword.trim().toLowerCase() === value.trim().toLowerCase()
		);
		console.log(presentValueIndex);
		if (presentValueIndex !== -1) {
			setKeywords((prev) => {
				const newArr = [...prev];
				newArr.splice(presentValueIndex, 1);
				return newArr;
			});
		}
	}
	const handleKeywordFormSubmit = function (e) {
		e.preventDefault();
		const { target }: { target: HTMLFormElement } = e as unknown as any;
		const keyword = target.querySelector("input")?.value.trim() as string;
		addKeyword(keyword);
		target.reset();
	} satisfies React.FormEventHandler<HTMLFormElement>;
	const captureFeatureImage = function (e) {
		const { files }: { files: FileList } = e.currentTarget as any;
		const newURL = URL.createObjectURL(files[0]);
		setFeatureImgURL(newURL);
	} satisfies React.ChangeEventHandler<HTMLInputElement>;
	function selectImage(target: HTMLInputElement) {
		target.click();
	}
	function generateMetaData() {
		if (keywords.length === 0) return;
	}

	return (
		<div className="max-w-screen-xl m-auto min-h-screen grid [grid-template-rows:_auto_1fr] px-4 py-12 gap-4">
			<h1 className="font-bold text-4xl">Create new blog post</h1>
			<div>
				<div>
					{/* Meta data collection section */}
					<div className="flex flex-col gap-6 my-8">
						<div className="flex gap-1 flex-col">
							<p>
								<b>Title:</b>
							</p>
							<input
								className="bg-slate-200 px-4 py-2 rounded-md flex-grow max-w-2xl focus:outline-none min-w-0"
								type="text"
								value={blogTitle}
								onChange={(e) => setBlogTitle(e.target.value)}
								placeholder="Blog title goes here..."
							/>
						</div>
						<div>
							<p className="mb-2">
								<b>Description:</b>
							</p>
							<textarea
								className="bg-slate-200 w-full max-w-2xl rounded-md p-4 focus:outline-none min-w-0"
								cols={30}
								rows={10}
								placeholder="Blog post description goes here..."
							></textarea>
						</div>
						<div>
							<p className="mb-2">
								<b>Keywords:</b>
							</p>
							<form
								className="flex items-center gap-2 mb-1"
								onSubmit={handleKeywordFormSubmit}
							>
								<input
									className="bg-slate-200 px-4 py-2 rounded-md flex-grow max-w-2xl focus:outline-none min-w-0"
									type="text"
									placeholder="Add a keyword..."
									required
								/>
								<button
									className="px-4 py-2 bg-blue-500 rounded-md transition-transform active:scale-95 flex justify-center items-center text-white"
									type="submit"
								>
									Add <GoPlus />
								</button>
							</form>
							{keywords.length > 0 && (
								<div className="flex gap-2 flex-wrap mt-2">
									{keywords.map((tag) => {
										return (
											<span
												className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs active:scale-95 transition-transform flex gap-2 justify-center items-center"
												key={crypto.randomUUID()}
											>
												{tag}{" "}
												<button
													onClick={() => removeKeyword(tag)}
													className="p-2"
												>
													<IoClose />
												</button>
											</span>
										);
									})}
								</div>
							)}
						</div>
						<div>
							<p className="mb-2">
								<b>Tags:</b>
							</p>
							<div className="flex gap-2 flex-wrap">
								{postTags.map((tag) => {
									const [isTagSelected, setIsTagSelected] = useState(false);
									return (
										<button
											onClick={(e) => {
												toggleTag(String(e.currentTarget.textContent));
												setIsTagSelected(!isTagSelected);
											}}
											className={`${
												isTagSelected
													? "bg-blue-500 text-white"
													: "bg-zinc-500 bg-opacity-70 text-slate-200"
											} px-2 py-1 rounded-full bg-blue-500 text-white text-xs active:scale-95 transition-transform`}
											key={crypto.randomUUID()}
										>
											{tag}
										</button>
									);
								})}
							</div>
							{selectedTags.length > 0 && (
								<p className="p-2 text-sm">
									<b>Selected tags: </b>
									{selectedTags.toString().split(",").join(", ")}.
								</p>
							)}
							<div>
								<form
									className="flex items-center gap-2 mt-2"
									onSubmit={handleKeywordFormSubmit}
								>
									<input
										className="bg-slate-200 px-4 py-2 rounded-md flex-grow max-w-2xl focus:outline-none min-w-0"
										type="text"
										placeholder="Add a new tag..."
										required
									/>
									<button
										className="px-4 py-2 bg-blue-500 rounded-md transition-transform active:scale-95 flex justify-center items-center text-white"
										type="submit"
									>
										Add <GoPlus />
									</button>
								</form>
							</div>
						</div>

						<div>
							<p>
								<b>Feature image:</b>
							</p>
							<div className="relative min-h-64 bg-slate-200 rounded-md flex justify-center items-center overflow-hidden">
								<img src={featureImgURL} alt="" />
								<input
									onChange={captureFeatureImage}
									type="file"
									className="hidden"
									accept="image/*"
								/>
								<button
									onClick={(e) =>
										selectImage(
											e.currentTarget.previousElementSibling as HTMLInputElement
										)
									}
									className="absolute top-1/2 left-1/2 p-6 flex justify-center items-center text-2xl bg-zinc-800 bg-opacity-20 rounded-full transition-transform -translate-x-1/2 -translate-y-1/2 active:scale-95 backdrop-blur-lg"
								>
									<ImCamera />
								</button>
							</div>
						</div>
					</div>
				</div>
				<h2 className="text-3xl font-bold my-2">{blogTitle}</h2>
				<ReactQuill
					modules={editorConfig.modules}
					formats={editorConfig.formats}
					theme="snow"
					placeholder="Blog post content goes here..."
					value={value}
					onChange={setValue}
				/>
				<div className="py-8 flex justify-end gap-4">
					<button className="px-4 py-2 rounded-md bg-yellow-500 text-white active:scale-95 transition-transform">
						Save as draft
					</button>
					<button className="px-4 py-2 rounded-md bg-blue-500 text-white active:scale-95 transition-transform">
						Upload
					</button>
				</div>
			</div>
		</div>
	);
}
