import React from "react";
import styled from "styled-components/native";
import ActionButton, {Wrapper, ActionButtonProps } from './ActionButton';

const CompactWrapper = styled(Wrapper)`
    max-width: 120px;  
    max-height: 50px;  
`;

const CompactButton: React.FC<ActionButtonProps> = (props) => {
    return (
        <CompactWrapper {...props}>
            <ActionButton {...props} />
        </CompactWrapper>
    );
};

export default CompactButton;