import React from "react";
import styled from "styled-components/native";
import ActionButton, {Wrapper, ActionButtonProps } from './ActionButton';

const CompactWrapper = styled(Wrapper)`
    min-width: 60px;
    max-width: 150px;
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