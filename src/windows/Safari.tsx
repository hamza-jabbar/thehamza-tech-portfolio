"use client";

import { WindowControls } from "#components";
import { blogPosts } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import { ChevronLeft, ChevronRight, Copy, MoveRight, PanelLeft, Plus, Search, Share, ShieldHalf } from "lucide-react";

const Safari = () => {
	return (
		<div className="flex flex-col h-full bg-white select-none overflow-hidden">
			{/* Desktop macOS Safari Toolbar */}
			<div className="hidden md:flex items-center justify-between px-4 py-3 rounded-t-lg bg-gray-50 border-b border-gray-200 text-sm text-gray-400 shrink-0">
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
							placeholder="thehamza.tech/blog"
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

			{/* Mobile iOS Safari Header */}
			<div className="md:hidden flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200 text-sm shrink-0">
				<WindowControls target="safari" />
				<div className="flex items-center gap-1.5 bg-gray-200/70 rounded-full px-3 py-1 text-xs text-gray-700 max-w-42.5 truncate">
					<span className="text-gray-400">🔒</span>
					<span className="truncate font-medium">thehamza.tech</span>
				</div>
				<Share size={18} className="text-[#007AFF]" />
			</div>

			{/* Safari Blog Content */}
			<div className="flex-1 overflow-y-auto p-4 md:p-10 max-w-3xl mx-auto w-full">
				<h2 className="text-xl font-bold text-pink-600 mb-6 md:mb-10">Articles & Insights</h2>

				{/* Blog Content */}
				<div className="space-y-6 md:space-y-8">
					{blogPosts.map(({ id, image, title, date, link }) => (
						<div
							key={id}
							className="bg-gray-50 md:bg-transparent p-4 md:p-0 rounded-2xl md:rounded-none border border-gray-100 md:border-none flex flex-col sm:grid sm:grid-cols-12 gap-4 items-start sm:items-center"
						>
							{/* Blog Image */}
							<div className="w-full sm:col-span-3 sm:w-auto">
								<img
									src={image}
									alt={title}
									className="w-full h-36 sm:h-24 rounded-xl object-cover shadow-sm"
								/>
							</div>

							<div className="w-full sm:col-span-9 space-y-2">
								<p className="text-xs text-gray-400 font-medium">{date}</p>
								<h3 className="font-semibold text-sm md:text-base text-gray-800 leading-snug">
									{title}
								</h3>
								<a
									href={link}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-600 text-xs hover:underline inline-flex items-center gap-1.5 font-medium pt-1"
								>
									Read Article <MoveRight className="size-3.5 hover:translate-x-1 transition-transform" />
								</a>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

const SafariWindow = WindowWrapper(Safari, "safari");

export default SafariWindow;
