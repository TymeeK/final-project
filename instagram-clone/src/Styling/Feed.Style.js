import styled from 'styled-components';

export const NavBar = styled.nav`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #dbdbdb;
    padding-bottom: 10px;
    background-color: #fff;
    position: fixed;
    top: 0px;
    width: 100%;
`;

export const ImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 60px;
`;

export const PostContainer = styled.div`
    outline: 1px solid lightgray;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 700px;
    height: 700px;
    margin-bottom: 50px;
    border-radius: 10px;
`;
export const UsernameDiv = styled.div`
    display: flex;
    justify-content: left;
    width: 100%;
    font-size: 25px;
    padding-top: 25px;
    padding-left: 10px;
`;
export const ImageDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 500px;
    margin-top: 30px;
`;

export const FeedImage = styled.img`
    object-fit: cover;
    min-width: 100%;
    max-width: 100%;
    max-height: 100%;
    min-height: 400px;
`;
