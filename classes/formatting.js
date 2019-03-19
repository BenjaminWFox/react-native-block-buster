export const formatScore = (score) => score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
