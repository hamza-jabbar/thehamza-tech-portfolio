import { WindowControls } from "#components/index";
import WindowWrapper from "#hoc/WindowWrapper";
import { Download } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	"pdfjs-dist/build/pdf.worker.min.mjs",
	import.meta.url
).toString();

const Resume = () => {
	return (
		<>
			<div className="flex items-center justify-between px-4 py-3 rounded-t-lg bg-gray-50 border-b border-gray-200 select-none text-sm text-gray-400">
				<WindowControls target="resume" />
				<h2 className="font-bold text-sm text-center flex-1 text-gray-700">Resume</h2>
				<a href="files/resume.pdf" download className="cursor-pointer" title="resume">
					<Download className="p-1 hover:bg-gray-200 rounded cursor-default size-6 text-gray-600" />
				</a>
			</div>

			<Document file="files/resume.pdf">
				<Page pageNumber={1} renderTextLayer renderAnnotationLayer />
			</Document>
		</>
	);
};

const ResumeWindow = WindowWrapper(Resume, "resume");

export default ResumeWindow;
