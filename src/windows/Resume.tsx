import { WindowControls } from "#components/index";
import WindowWrapper from "#hoc/WindowWrapper";
import { Download, FileText } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import { useState, useEffect } from "react";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	"pdfjs-dist/build/pdf.worker.min.mjs",
	import.meta.url
).toString();

const Resume = () => {
	const [pageWidth, setPageWidth] = useState<number>(() => {
		if (typeof window !== "undefined") {
			return Math.min(window.innerWidth - 32, 600);
		}
		return 600;
	});

	useEffect(() => {
		const handleResize = () => {
			setPageWidth(Math.min(window.innerWidth - 32, 600));
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div className="flex flex-col h-full bg-gray-100/50 select-none overflow-hidden">
			{/* Header */}
			<div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200 text-sm text-gray-400 shrink-0">
				<WindowControls target="resume" />
				<h2 className="font-bold text-sm text-center flex-1 text-gray-700">Resume / CV</h2>
				<a
					href="files/resume.pdf"
					download
					className="flex items-center gap-1 text-[#007AFF] text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 hover:bg-blue-100 active:scale-95 transition-all"
					title="Download Resume"
				>
					<Download size={14} />
					<span className="hidden sm:inline">Download</span>
				</a>
			</div>

			{/* PDF Document Canvas */}
			<div className="flex-1 overflow-y-auto overflow-x-hidden p-2 sm:p-4 flex flex-col items-center">
				<div className="shadow-lg rounded-lg overflow-hidden bg-white max-w-full">
					<Document
						file="files/resume.pdf"
						loading={
							<div className="p-12 flex flex-col items-center gap-3 text-gray-400">
								<FileText className="animate-pulse size-10 text-blue-500" />
								<p className="text-xs">Loading Resume...</p>
							</div>
						}
						error={
							<div className="p-8 text-center space-y-3">
								<p className="text-sm text-gray-600">Preview not available in this browser.</p>
								<a
									href="files/resume.pdf"
									download
									className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-medium"
								>
									<Download size={14} /> Download PDF
								</a>
							</div>
						}
					>
						<Page
							pageNumber={1}
							width={pageWidth}
							renderTextLayer
							renderAnnotationLayer
						/>
					</Document>
				</div>
			</div>
		</div>
	);
};

const ResumeWindow = WindowWrapper(Resume, "resume");

export default ResumeWindow;
