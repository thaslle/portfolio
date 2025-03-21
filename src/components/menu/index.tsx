import s from './menu.module.scss'

export const Menu = () => {
  return (
    <nav className={s.menu}>
      <header>
        <figure></figure>
        <h1>Thalles Lopes</h1>
        <p className={s.roles}>Creative Developer</p>

        <button aria-label="Menu"></button>
      </header>
    </nav>
  )
}
