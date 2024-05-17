import React from 'react';
import { CSpinner } from '@coreui/react';

function Loading() {
    return (
        <div className="full-background">
            <div className="d-flex justify-content-center align-items-center full-height full-width text-center">
                <CSpinner color="primary" />
            </div>
        </div>
    );
}

export default Loading;