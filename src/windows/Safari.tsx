import { WindowControls } from "#components";
import { blogPosts } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import { ChevronLeft, ChevronRight, Copy, MoveRight, PanelLeft, Plus, Search, Share, ShieldHalf } from "lucide-react";

const Safari = () => {
	return (
		<>
			<div className="flex items-center justify-between px-4 py-3 rounded-t-lg bg-gray-50 border-b border-gray-200 select-none text-sm text-gray-400">
				<WindowControls target="safari" />

				<PanelLeft className="ml-10 p-1 hover:bg-gray-200 rounded cursor-default size-6" />

				<div className="flex items-center gap-1 ml-5">
					<ChevronLeft className="p-1 hover:bg-gray-200 rounded cursor-default size-6" />
					<ChevronRight className="p-1 hover:bg-gray-200 rounded cursor-default size-6" />
				</div>

				<div className="flex-1 flex items-center justify-center gap-3">
					<ShieldHalf className="p-1 hover:bg-gray-200 rounded cursor-default size-6" />
					<div className="flex items-center gap-3 w-2/3 bg-white border border-gray-300 rounded-lg px-3 py-1.5 shadow-sm">
						<Search className="size-4 text-gray-400" />
						<input
							type="text"
							placeholder="Search or enter website name"
							className="flex-1 outline-none text-xs text-gray-700 placeholder:text-gray-400"
							readOnly
						/>
					</div>
				</div>
				<div className="flex items-center gap-3">
					<Share className="p-1 hover:bg-gray-200 rounded cursor-default size-6" />
					<Plus className="p-1 hover:bg-gray-200 rounded cursor-default size-6" />
					<Copy className="p-1 hover:bg-gray-200 rounded cursor-default size-6" />
				</div>
			</div>

			<div className="bg-white p-10 max-w-3xl mx-auto max-h-[70vh] overflow-y-auto">
				<h2 className="text-xl font-bold text-pink-600 mb-10">My Blog</h2>

				{/* Blog Content */}
				<div className="space-y-8">
					{blogPosts.map(({ id, image, title, date, link }) => (
						<div key={id} className="grid grid-cols-12 gap-5 items-center">
							{/* Blog Image */}
							<div className="col-span-2">
								<img src={image} alt={title} className="size-full rounded-md object-cover" />
							</div>

							<div className="col-span-10 space-y-3">
								<p className="text-xs text-gray-500">{date}</p>
								<h3 className="font-semibold text-base text-gray-800">{title}</h3>
								<a
									href={link}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-600 text-xs hover:underline flex items-center gap-2 font-medium"
								>
									Check out the full post <MoveRight className="size-4 hover:translate-x-1 transition-transform" />
								</a>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

const SafariWindow = WindowWrapper(Safari, "safari");

export default SafariWindow;
