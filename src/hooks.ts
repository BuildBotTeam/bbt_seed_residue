import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "./store/store";
// import {useSearchParams} from "react-router-dom";


export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// export const useCustomSearchParams = () => {
//     const [search, setSearch] = useSearchParams();
//     const searchAsObject = Object.fromEntries(
//         new URLSearchParams(search)
//     );
//
//     return [searchAsObject, setSearch];
// };