import dayjs from "dayjs";
import { navIcons, navLinks } from "#constants";
import useWindowStore from "#store/window";

const Navbar = () => {
	const { openWindow } = useWindowStore(); // Open window when navbar item is clicked

	return (
		<nav className="flex justify-between items-center bg-white/50 backdrop-blur-3xl p-2 px-5 select-none">
			<div className="flex items-center max-sm:w-full max-sm:justify-center gap-5">
				<img src="/images/logo.svg" alt="logo" />
				<p className="font-bold text-sm text-gray-900">Hamza's Portfolio</p>

				<ul className="flex items-center gap-5 max-sm:hidden">
					{navLinks.map(({ id, name, type }) => (
						<li key={id} onClick={() => openWindow(type)} className="cursor-pointer">
							<p className="text-sm hover:underline transition-all">{name}</p>
						</li>
					))}
				</ul>
			</div>

			<div className="flex items-center gap-5 max-sm:hidden">
				<ul className="flex items-center gap-2">
					{navIcons.map(({ id, img }) => (
						<li key={id}>
							<img className="p-1 hover:bg-gray-200 rounded cursor-default transition-colors" src={img} alt={`icon-${id}`} />
						</li>
					))}
				</ul>

				<time className="text-sm font-medium text-black">{dayjs().format('ddd MMM D h:mm A')}</time>
			</div>
		</nav>
	);
};

export default Navbar;
