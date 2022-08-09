import CakePrice from "../../packages/uikit/src/components/CakePrice/CakePrice";


const LLAMA_TVL = 'https://api.llama.fi/tvl/quasarswap'

const getLlamaTVL = () => {
  return fetch(`${LLAMA_TVL}`)
}

export { getLlamaTVL }

