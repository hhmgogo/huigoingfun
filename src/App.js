import './App.css';
import styled from 'styled-components';

/*stylesheet*/
const Blog = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
padding:40px;
border-bottom:1px sold rgba(0,0,0,0.05);
`;

const Heading = styled.div`
 display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Span = styled.span`
color: #f33c3c;
`;

const H3 = styled.h3`
font-size:2.4rem; 
color: #2b2b2b;
font-weight: 600;
`;

const BlogCentainer = styled.div`
  
`;

const BlogBox1 = styled.div`
  
`;
function App() {

  return (
    <div>
      <Blog >
        <Heading >
          <Span> My Recent Posts </Span>
          <H3 > My Blog </H3>
        </Heading >
      </Blog>

    /*blog-container*/
      <BlogCentainer>
      //box1
        <BlogBox1>

        </BlogBox1>
      </BlogCentainer>
    </div>
  );
}

export default App;