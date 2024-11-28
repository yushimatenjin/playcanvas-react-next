export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const resetStyles = {
    margin: 0,
    padding: 0,
  };

  const headerStyles = {
    padding: 0,
    backgroundColor: '#333',
    color: 'white',
  };

  const navStyles = {
    display: 'flex',
    gap: 0,
  };

  const linkStyles = {
    color: 'white',
    textDecoration: 'none',
    padding: '12px 20px',
    fontSize: '16px',
    fontWeight: 500,
    letterSpacing: '0.5px',
    transition: 'background-color 0.2s',
  };

  return (
    <html lang="ja" style={resetStyles}>
      <body style={resetStyles}>
        <header style={headerStyles}>
          <nav style={navStyles}>
            <a href="./glb-viewer" style={linkStyles}>
              GLB Viewer
            </a>
            <a href="./splat-viewer" style={linkStyles}>
              Splat Viewer
            </a>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
