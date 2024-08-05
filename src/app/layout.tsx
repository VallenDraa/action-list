import { Providers } from '@/features/shared/components/providers';

import './globals.css';

export const metadata = { title: 'TooDoo' };

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
