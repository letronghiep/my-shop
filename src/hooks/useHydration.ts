// import { useEffect } from "react";
// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// const useBoundStore = create(
//   persist(
//     (set) => ({
//       // ...
//       _hasHydrated: false,
//       setHasHydrated: (state) => {
//         set({
//           _hasHydrated: state,
//         });
//       },
//     }),
//     {
//       // ...
//       onRehydrateStorage: (state) => {
//         return () => state.setHasHydrated(true);
//       },
//     }
//   )
// );
// const useHydration = () => {
//   useEffect(() => {
//     // Note: This is just in case you want to take into account manual rehydration.
//     // You can remove the following line if you don't need it.
//     const unsubHydrate = useBoundStore.persist.onHydrate(() =>
//       setHydrated(false)
//     );
//     const unsubFinishHydration = useBoundStore.persist.onFinishHydration(() =>
//       setHydrated(true)
//     );
//     setHydrated(useBoundStore.persist.hasHydrated());

//     return () => {
//       unsubHydrate();
//       unsubFinishHydration();
//     };
//   }, []);

//   return hydrated;
// };
