// import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
// import * as http from "./http";

// export function GetQuery(queryKey, url, enabled = true) {
//     const {status, data, error, refetch} = useQuery({
//         queryKey,
//         queryFn: async () => {
//             return await http.Get(url);
//         },
//         enabled,
//     });
//     return {data, status, error, refetch};
// }

// export function MutationQuery(url, model, params, isFormData = true) {
//     const {data, status, error} = useMutation({
//         mutationFn: async () => {
//             return await http.Post(url, model, params, isFormData);
//         },
//     });
//     return {data, status, error};
// }
