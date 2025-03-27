import { useMutation, useQueryClient } from "@tanstack/react-query"
import { instance } from ".."
import { Project, UpdateProject } from "./type"

const router = "/projects"

export const useAddProject = () => {
    const queryClient = useQueryClient()
    return useMutation<any, Error, Project>({
        mutationFn: async (param: Project) => {
            const response = await instance.post(router, param)
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] })
        },
    })
}

export const useUpdateProject = () => {
    const queryClient = useQueryClient()
    return useMutation<any, Error, UpdateProject>({
        mutationFn: async (param: UpdateProject) => {
            const response = await instance.put(`${router}/${param.id}`, param)
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] })
        },
    })
}

export const useDeleteProject = () => {
    const queryClient = useQueryClient()
    return useMutation<any, Error, string>({
        mutationFn: async (id: string) => {
            const response = await instance.delete(`${router}/${id}`)
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] })
        },
    })
}
