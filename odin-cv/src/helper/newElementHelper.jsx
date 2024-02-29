export function newInput(className, type, name){
    return (
        <>
            <input className={className} type={type} name={name} required></input>
        </>
    )
}