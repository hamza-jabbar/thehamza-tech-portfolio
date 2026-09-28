"use client";

import { Document, Page, pdfjs } from "react-pdf";
import { useState, useEffect } from "react";
import { Download, FileText } from "lucide-react";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
}

interface PDFViewerProps {
  pdfUrl: string;
}

export const PDFViewer = ({ pdfUrl }: PDFViewerProps) => {
  const [pageWidth, setPageWidth] = useState<number>(600);

  useEffect(() => {
    const handleResize = () => {
      setPageWidth(Math.min(window.innerWidth - 32, 600));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="shadow-lg rounded-lg overflow-hidden bg-white max-w-full">
      <Document
        file={pdfUrl}
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
              href={pdfUrl}
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
  );
};

export default PDFViewer;
