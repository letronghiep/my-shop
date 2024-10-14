// "use client";
// import { isAuthenticated } from "@/utils/Auth";
// import { redirect } from "next/navigation";
// import { useRouter } from "next/router";
// import { useEffect } from "react";
// export default function isAuth(Component: any) {
//   return function IsAuth(props: any) {
//     const router = useRouter();
//     const pathname = router.pathname;
//     const auth = isAuthenticated;
//     useEffect(() => {
//       if (!auth) {
//         return redirect(`/${pathname}`);
//       }
//     }, []);
//     if (!auth) return null;
//     return <Component {...props} />;
//   };
// }
