import {  Disclosure,  DisclosureButton,  DisclosurePanel,  Menu,  MenuButton,  MenuItem,  MenuItems} from '@headlessui/react';
import {  Bars3Icon,  BellIcon,  XMarkIcon} from '@heroicons/react/24/outline';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../Store/authSlice';

const NAV_ITEMS = [
  { name: 'Home', path: '/home' },
  { name: 'About', path: '/about' },
  { name: 'Careers', path: '/careers' },
  { name: 'Contact Us', path: '/contact-us' },
];

const classNames = (...classes) => classes.filter(Boolean).join(' ');

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.login.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Disclosure as="nav" className="bg-blue-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile menu toggle */}
          <div className="flex items-center sm:hidden">
            <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-100 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
              <Bars3Icon className="block h-6 w-6 data-[open]:hidden" aria-hidden="true" />
              <XMarkIcon className="hidden h-6 w-6 data-[open]:block" aria-hidden="true" />
            </DisclosureButton>
          </div>

          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="worker force" className="h-8 w-auto rounded-xl" />
              <span className="text-white text-lg font-semibold hidden sm:inline">Work Force</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden sm:flex sm:ml-6 space-x-10">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-100 hover:bg-gray-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Profile Menu */}
          <div className="ml-3 relative">
            <Menu as="div" className="relative">
              <div>
                <MenuButton className="flex rounded-full bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white">
                  <img
                    src="/userpic.jpg"
                    alt="User profile"
                    className="h-8 w-8 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg  focus:outline-none">
                {user?.id && (
                  <MenuItem>
                    {({ active }) => (
                      <span
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700'
                        )}
                      >
                        ID: {user.id}
                      </span>
                    )}
                  </MenuItem>
                )}
                <MenuItem>
                  {({ active }) => (
                    <Link
                      to="home/profilesetting"
                      className={classNames(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700'
                      )}
                    >
                      Profile Settings
                    </Link>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={classNames(
                        active ? 'bg-gray-100' : '',
                        'w-full text-left px-4 py-2 text-sm text-gray-700'
                      )}
                    >
                      Logout
                    </button>
                  )}
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <DisclosurePanel className="sm:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <DisclosureButton
              key={item.name}
              as={Link}
              to={item.path}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Header;
