// import React, { useState } from "react";
// import { Logo } from "@/assets/Logo";
// import { RouteType } from "@/utils/types";
// import { navRoutes } from "@/utils/variables";
// import Button from "../../../ui/form/Button";
// import NavBarItem from "./NavBarItem";
// import AuthModal from "@/components/pages/auth/AuthModal";
// import { useAuthModal } from "@/hooks/useAuthModal";
// import useUser from "@/hooks/useUser";
// import Image from "next/image";
// import SectionContainer from "@/components/Layout/SectionContainer";

// interface NavBarProps {
//   logoColor: string;
//   headerStyle: string;
// }

// const NavBar: React.FC<NavBarProps> = ({ logoColor, headerStyle }) => {
//   const { isOpen, currentScreen, openModal, closeModal, switchScreen } =
//     useAuthModal();
//   const { userAuthDetails, userDetails, loadingUserDetails } = useUser();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };
//   // console.log(loadingUserDetails);

//   return (
//     <>
//       <SectionContainer
//         contentContainerClassName={`${headerStyle} sticky top-0 bg-opacity-40 z-30 backdrop-filter backdrop-blur-md`}
//         className={`flex justify-between md:grid items-center grid-cols-3 py-6 w-full`}
//       >
//         <div className="flex flex-start">
//           <Logo color={logoColor} />
//         </div>
//         <nav className="hidden md:flex items-center justify-center">
//           <ul className="flex gap-6 items-center">
//             {navRoutes.map((route: RouteType, index) => (
//               <NavBarItem key={index} route={route} />
//             ))}
//           </ul>
//         </nav>

//         <div className="flex justify-end items-center">
//           {userAuthDetails && (
//             <div className="size-12 hidden md:block rounded-full bg-slate-200 overflow-hidden relative">
//               {loadingUserDetails ? (
//                 <p>Loading user details...</p>
//               ) : (
//                 userDetails && (
//                   <Image
//                     alt=""
//                     src={userDetails?.avatar}
//                     className="object-center object-cover"
//                     fill
//                   />
//                 )
//               )}
//             </div>
//           )}

//           {!userAuthDetails && (
//             <Button
//               className="hidden md:block"
//               onClick={() => openModal("login")}
//             >
//               Login
//             </Button>
//           )}

//           <button
//             className="md:hidden ml-4 text-gray-600"
//             onClick={toggleMobileMenu}
//           >
//             {isMobileMenuOpen ? <p>x</p> : <p>Menu</p>}
//           </button>
//         </div>
//       </SectionContainer>

//       {isMobileMenuOpen && (
//         <div className="md:hidden fixed inset-0 z-40 bg-white">
//           <div className="p-4">
//             <button className="mb-4 text-gray-600" onClick={toggleMobileMenu}>
//               X
//             </button>
//             <nav>
//               {userAuthDetails && (
//                 <div className="size-12  rounded-full bg-slate-200 overflow-hidden relative">
//                   {loadingUserDetails
//                     ? "lodaing"
//                     : userDetails && (
//                         <Image
//                           alt=""
//                           src={userDetails?.avatar}
//                           className="object-center object-cover"
//                           fill
//                         />
//                       )}
//                 </div>
//               )}
//               <ul className="space-y-4">
//                 {navRoutes.map((route: RouteType, index) => (
//                   <li key={index} onClick={toggleMobileMenu}>
//                     <NavBarItem route={route} />
//                   </li>
//                 ))}
//               </ul>
//             </nav>
//             {!userAuthDetails && (
//               <Button
//                 className="mt-6 w-full"
//                 onClick={() => {
//                   openModal("login");
//                   toggleMobileMenu();
//                 }}
//               >
//                 Login
//               </Button>
//             )}
//           </div>
//         </div>
//       )}

//       <AuthModal
//         isOpen={isOpen}
//         onClose={closeModal}
//         currentScreen={currentScreen}
//         switchScreen={switchScreen}
//       />
//     </>
//   );
// };

// export default NavBar;

import React, { useState } from "react";
import { Logo } from "@/assets/Logo";
import { navRoutes } from "@/utils/variables";
import Button from "../../../ui/form/Button";
import NavBarItem from "./NavBarItem";
import AuthModal from "@/components/pages/auth/AuthModal";
import { useAuthModal } from "@/hooks/useAuthModal";
import useUser from "@/hooks/useUser";
import SectionContainer from "@/components/Layout/SectionContainer";
import MobileMenu from "./MobileMenu";
import UserAvatar from "./UserAvatar";
import { NavBarProps } from "@/utils/types";
import { MenuCloseIcon, MenuIcon } from "@/assets/icon";

const NavBar: React.FC<NavBarProps> = ({ logoColor, headerStyle }) => {
  const { isOpen, currentScreen, openModal, closeModal, switchScreen } =
    useAuthModal();
  const { userAuthDetails, loadingUserDetails, userDetails } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <SectionContainer
        contentContainerClassName={`${headerStyle} sticky top-0 bg-opacity-40 z-30 backdrop-filter backdrop-blur-md`}
        className={`flex justify-between md:grid items-center grid-cols-3 py-6 w-full`}
      >
        <div className="flex flex-start">
          <Logo color={logoColor} />
        </div>
        <nav className="hidden md:flex items-center justify-center">
          <ul className="flex gap-6 items-center">
            {navRoutes.map((route, index) => (
              <NavBarItem key={index} route={route} />
            ))}
          </ul>
        </nav>

        <div className="flex justify-end items-center">
          {userAuthDetails ? (
            <UserAvatar
              loading={loadingUserDetails}
              avatar={userDetails?.avatar || ""}
              className="md:block hidden"
            />
          ) : (
            <Button
              className="hidden md:block"
              onClick={() => openModal("login")}
            >
              Login
            </Button>
          )}

          <button
            className="md:hidden ml-4 text-gray-600"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <MenuCloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </SectionContainer>

      {isMobileMenuOpen && (
        <MobileMenu
          userAuthDetails={userAuthDetails}
          loadingUserDetails={loadingUserDetails}
          userDetails={userDetails}
          toggleMobileMenu={toggleMobileMenu}
          openModal={openModal}
        />
      )}

      <AuthModal
        isOpen={isOpen}
        onClose={closeModal}
        currentScreen={currentScreen}
        switchScreen={switchScreen}
      />
    </>
  );
};

export default NavBar;
