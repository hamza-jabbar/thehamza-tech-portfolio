export const metadata = {
  title: "Content Studio | thehamza.tech",
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ height: "100vh", maxHeight: "100dvh", overscrollBehavior: "none", margin: 0, padding: 0 }}>
      {children}
    </div>
  );
}
