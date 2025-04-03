import PortfolioService from "../apis/portfolio"

async function getInfo() {
    const data = await PortfolioService.getPortfolio()
    return data
}

export default getInfo
