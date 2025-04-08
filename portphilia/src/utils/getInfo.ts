import PortfolioService from "../apis/portfolio"
import ProjectsService from "../apis/project"

export async function getPortfolio() {
    const data = await PortfolioService.getPortfolio()
    return data
}

export async function getProject() {
    const data = await ProjectsService.getProjects()
    return data
}

export async function getProjectById(id: number) {
    const data = await ProjectsService.getProjectById(id)
    return data
}
