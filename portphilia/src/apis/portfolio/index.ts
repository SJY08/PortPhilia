import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { instance } from ".."
import { Portfolio } from "./type"

const router = "/portfolio"

export const usePortfolio = () => {
    return useQuery<Portfolio, Error>({
        queryKey: ["portfolio"],
        queryFn: async () => {
            const response = await instance.get(router)
            return response.data
        },
    })
}

export const useUpdatePortfolio = () => {
    const queryClient = useQueryClient()
    return useMutation<Portfolio, Error, Portfolio>({
        mutationFn: async (param: Portfolio) => {
            const response = await instance.put(router, param)
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["portfolio"] })
        },
    })
}
