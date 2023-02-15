
interface Props {
    children?: any
    title: string;
    onClick: (e: any) => void;
    style?: any,
    loading?: boolean
    disabled?: boolean
    type?: 'button' | 'submit'
}
const Button: React.FC<Props> = ({ children, title, onClick, style, loading, disabled = false, type = 'button' }) => {
    return (
        <div>

            <button
                disabled={loading || disabled}
                onClick={onClick}
                type={type}
                className={`w-full disabled:opacity-60 hover:shadow-none focus:shadow-inner transition-shadow duration-300 flex items-center gap-2 justify-center py-2 px-4 border border-transparent rounded-full shadow text-small font-medium bg-default text-white focus:outline-none  ${style} `}
            >
                {loading ? title + '...' : title}
                {children}
            </button>
        </div>

    )
}


export default Button