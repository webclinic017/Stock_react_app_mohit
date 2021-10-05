import http from '../constant';


export const getPortfolios = () => {
    return http.get('/dashboard/me/portfolio/')
}

export const getDonutSectorData = (portfolio_name) => {
    return http.post('/dashboard_api_sectorwise_data/', { portfolio_name });
}

export const getUnrealisticData = (portfolio_name) => {
    return http.post('/dashboard_api_get_realised_unrealised_gain_loss/', { portfolio_name });

}

export const portfolioStats = (portfolio_name, time_period) => {
    return http.post('/dashboard_api_get_portfolio_statistics/', { portfolio_name, time_period })
}

export const performanceApiLineGraph = (portfolio_name, time_period) => {
    return http.post('/dashboard_api_get_portfolio_performance/', { portfolio_name, time_period })
}
export const performanceApiLineGraphComparisonDefault = (portfolio_name, time_period) => {
    return http.post('/dashboard_api_get_portfolio_performance_comparision/', { portfolio_name, time_period })
}

export const performanceApiLineGraphComparison = (trading_symbol, time_period) => {
    return http.post('/dashboard_api_get_performance_comparision_nifty_sensex/', { trading_symbol, time_period })
}

export const getDashboardStreamingApi = (portfolio_name) => {
    return http.post('/dashboard_api_streaming/', { portfolio_name })

}

export const getBuyingPower = () => {
    return http.get('/dashboard_api_get_buying_power/');
}