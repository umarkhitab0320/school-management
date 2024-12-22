'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type LoadingButtonProps = {
    href: string;
    imgSrc: string;
}

const LoadingButton = ({ href, imgSrc }: LoadingButtonProps) => {
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setLoading(true);
    };

    return (
        <>
            <Link onClick={handleClick} href={href} passHref>
                {loading ? (
                    <img src="/loading.gif" alt="" width={40} height={40} />
                ) : (
                    <div className='flex items-center gap-2'>

                        <Image src={imgSrc} alt="" width={40} height={40} />
                    </div>

                )
                }

            </Link>

        </>

    );
};

export default LoadingButton;