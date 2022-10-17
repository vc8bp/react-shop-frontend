import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'


const Div = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

`

export default function PaymentSuccess() {
    const query = useSearchParams()[0];
    const refID = query.get("refrence");
  return (
    <Div>
        <h1>Payment Successful</h1>
        <p>ref_id: {refID}</p>
    </Div>
  )
}
