import { AntdRegistry } from '@ant-design/nextjs-registry';

export const metadata = { title: 'TooDoo' };

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<AntdRegistry>{children}</AntdRegistry>
			</body>
		</html>
	);
}
