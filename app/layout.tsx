import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ weight: "400", preload: true, subsets: ["latin"] });

export const metadata: Metadata = {
	metadataBase: new URL("https://victoronah.onrender.com"),
	title: "Victor Onah - Full-Stack Web Developer",
	description: "Connect with Victor Onah",
	openGraph: {
		type: "website",
		description: "Victor Onah is a Full-Stack Web Developer",
		title: "Victor Onah",
		url: "https://victoronah.dev",
	},
	twitter: {
		description: "Victor Onah is a Full-Stack Web Developer",
		title: "Victor Onah",
		card: "summary_large_image",
		creator: "@__allAboutJS",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={poppins.className}>{children}</body>
		</html>
	);
}
