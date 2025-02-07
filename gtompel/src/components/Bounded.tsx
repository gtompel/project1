

 const Bounded = React.forwardRef<HTMLDivElement, BoundedProps>(
    ({as: Comp = `section`,className, children,...restProps}, ref) => {
        return (
            <Comp ref={ref} className={"px-4 py-10 md:px-6 md:py-14 lg:py-16"}
            {...restProps}>
                <div className="w-full max-w-screen-7xl mx-auto">
                    <div className={className}>
                        {children}
                    </div>
                </div>
                {children}

            </Comp>
        )
    } 
 )