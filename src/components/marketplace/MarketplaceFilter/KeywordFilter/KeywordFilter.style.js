import {css} from "emotion";

export let keywordFilterCss = css`
    display: flex;
    padding: 0 25px;
    

    .input-icon {
        position: relative;
        width: 100%;
        
        i {
            position: absolute;
            left: 3px;
            top: 50%;
            transform: translateY(-50%);
            color: #ccc;
            font-size: 20px;
        }
        
        input {
            width: 100%;
            color: #333;
            background-color: #fff;
            border-color: #ccc;
            padding: 8px 8px 8px 23px;
            border-top-left-radius: 3px;
            border-bottom-left-radius: 3px;
            outline: none;
            border: 1px solid #ccc;
        }
    }
    
    .search-btn {
        outline: none;
        border: 1px solid #ccc;
        border-left: 0;
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
    }
`;
