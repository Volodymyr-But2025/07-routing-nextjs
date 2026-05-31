import SidebarNotes from "./@sidebar/default";
import css from "./LayoutNotes.module.css";

export default function FilterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  sidebar: React.ReactNode;
}>) {
  return (
    <section className={css.container}>
      <aside className={css.sidebar}>
        <SidebarNotes />
      </aside>
      <div className={css.notesWrapper}>{children}</div>
    </section>
  );
}
