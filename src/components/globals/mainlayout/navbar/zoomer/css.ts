import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  padding: .75rem;
  gap: .5rem;

  input {
    padding: 0;
  }

  span {
    font-weight: 700;
    text-align: center;
  }

  .slider {
    flex: 1;
  }
`;