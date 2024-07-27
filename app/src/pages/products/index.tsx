import React from 'react'
import Error from '@/Components/Error';

const Index = () => {
    return (
        <Error 
            title="не найдено"
            description="Не удается получить доступ к этой странице"
        />
    );
}

export default Index