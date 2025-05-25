import {useState, useEffect} from 'react'

function StockValue({symbol, shares}) {
	
	const [valueData, setValueData] = useState({
		
		price:'loading',
		marketValue:'loading'
	
	})
	
	useEffect( () => {
		
		async function fetchPrice() {
			
			try {
				
				const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=YL7T6SQRK6OCF395`)
				
				const data = await response.json()
				
				if (data) {
					
					const currentPrice = parseFloat(data['Global Quote']['05. price']).toFixed(2)
				
				setValueData({price:currentPrice,
				marketValue:(currentPrice * parseFloat(shares)).toFixed(2)
											
				})
				
				}
				
			} catch (err) {
				console.log(err)
			}
	
	}
	
	fetchPrice()
}, [symbol, shares])

return ( 

<>
<td class='shares-cell'>
<p class="details-text">{valueData.price}</p>
</td>

<td class='shares-cell'>
<p class="details-text">${valueData.marketValue}</p>
</td>
</>

)
}

export default StockValue;