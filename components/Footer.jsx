import styled from '@emotion/styled'

export default function Footer(){
    return(
        <Wrapper>
            <div className="kota-dijangkau">
                <span className="text">1 Kota terjangkau: </span><span className="city-name">Semarang</span>
            </div>
            <p>Dibuat dengan penuh cinta oleh <a href="https://github.com/devardha" target="_blank">@devardha</a></p>
        </Wrapper>
    )
}

const Wrapper = styled.footer`
    max-width:512px;
    margin: auto;
    padding:2rem 0 1rem 0;

    .kota-dijangkau{
        display:flex;
        justify-content:center;
        align-items:center;

        .text{
            font-size:.9rem;
            margin-right:.5rem;
        }
        .city-name{
            border:1px solid #226cfb;
            color: blue;
            background: #f0f5ff;
            padding:4px 8px;
            font-size:.8rem;
            border-radius:3rem;
        }
    }

    p{
        text-align:center;
        font-size:.9rem;
    }
`