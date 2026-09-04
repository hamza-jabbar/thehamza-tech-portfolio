"use client";

import dynamic from "next/dynamic";
import { WindowControls } from "#components/index";
import WindowWrapper from "#hoc/WindowWrapper";
import { Download, FileText } from "lucide-react";
import { useSanityData } from "#hooks/useSanityData";

const PDFViewer = dynamic(() => import("#components/PDFViewer"), {
  ssr: false,
  loading: () => (
    <div className="p-12 flex flex-col items-center gap-3 text-gray-400">
      <FileText className="animate-pulse size-10 text-blue-500" />
      <p className="text-xs">Loading Resume…</p>
    </div>
  ),
});

const Resume = () => {
  const { data, loading } = useSanityData();

  // Resolve PDF URL: Sanity asset first, fallback to local file
  const pdfUrl = data.resume?.fileUrl ?? "/files/resume.pdf";
  const resumeTitle = data.resume?.title ?? "Resume / CV";

  return (
    <div className="flex flex-col h-full bg-gray-100/50 select-none overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200 text-sm text-gray-400 shrink-0">
        <WindowControls target="resume" />
        <h2 className="font-bold text-sm text-center flex-1 text-gray-700">{resumeTitle}</h2>
        <a
          href={pdfUrl}
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
        {loading ? (
          <div className="p-12 flex flex-col items-center gap-3 text-gray-400">
            <FileText className="animate-pulse size-10 text-blue-500" />
            <p className="text-xs">Loading Resume…</p>
          </div>
        ) : (
          <PDFViewer pdfUrl={pdfUrl} />
        )}
      </div>
    </div>
  );
};

const ResumeWindow = WindowWrapper(Resume, "resume");

export default ResumeWindow;
