import { Link, router } from "@inertiajs/react";
import ChevronRightIcon from "@/assets/icons/chevron-right.svg?react";
import ChevronLeftIcon from "@/assets/icons/chevron-left.svg?react";

const ELLIPSIS = "…";
const buildPages = (current, total, delta = 1) => {
    const range = [];
    const left = Math.max(2, current - delta);
    const right = Math.min(total - 1, current + delta);

    range.push(1);
    if (left > 2) range.push("…");
    for (let i = left; i <= right; i++) range.push(i);
    if (right < total - 1) range.push("…");
    if (total > 1) range.push(total);

    if (total <= 7) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }
    return range;
};

const PageLink = ({
    href,
    children,
    isActive = false,
    disabled = false,
    className = "button-pagination",
    onNavigateStart = () => {},
    onNavigateFinish = () => {},
}) => {
    const cls = [
        className,
        isActive ? "is-active" : "",
        disabled ? "is-disabled" : "",
    ]
        .join(" ")
        .trim();

    if (disabled) {
        return (
            <span className={cls} aria-disabled="true">
                {children}
            </span>
        );
    }

    const useAnchor = !router?.visit;
    return useAnchor ? (
        <a
            href={href}
            className={cls}
            aria-current={isActive ? "page" : undefined}
            onClick={onNavigateStart}
        >
            {children}
        </a>
    ) : (
        <Link
            href={href}
            className={cls}
            aria-current={isActive ? "page" : undefined}
            onStart={onNavigateStart}
            onFinish={onNavigateFinish}
        >
            {children}
        </Link>
    );
};

export default function Pagination({
    currentPage = 1,
    totalPages = 1,
    delta = 1,
    onNavigateStart = () => {},
    onNavigateFinish = () => {},
    getHref = (p) => `/peliculas?page=${p}`,
    showPrevNext = true,
    className = "pagination",
    itemClassName = "button-pagination",
    activeClassName = "is-active",
    disabledClassName = "is-disabled",
}) {
    const HARD_MAX = 500;
    const effectiveTotal = Math.max(1, Math.min(totalPages || 1, HARD_MAX));

    const page = Math.max(1, Math.min(currentPage || 1, effectiveTotal));
    const items = buildPages(page, effectiveTotal, delta);
    const prevHref = getHref(Math.max(1, page - 1));
    const nextHref = getHref(Math.min(effectiveTotal, page + 1));
    const itemCls = (active = false, disabled = false) =>
        [
            itemClassName,
            active && activeClassName,
            disabled && disabledClassName,
        ]
            .filter(Boolean)
            .join(" ");

    return (
        <nav className={className} aria-label="Paginación">
            {showPrevNext && (
                <PageLink
                    href={prevHref}
                    disabled={page <= 1}
                    className={itemCls(false, page <= 1)}
                    onNavigateStart={onNavigateStart}
                    onNavigateFinish={onNavigateFinish}
                >
                    <ChevronLeftIcon className="chevron-left-icon" />
                </PageLink>
            )}

            {items.map((p, idx) =>
                p === ELLIPSIS ? (
                    <span
                        key={`ellipsis-${idx}`}
                        className={`${itemClassName} ellipsis`}
                        aria-hidden="true"
                    >
                        {ELLIPSIS}
                    </span>
                ) : (
                    <PageLink
                        key={p}
                        href={getHref(p)}
                        isActive={p === page}
                        className={itemCls(p === page)}
                        onNavigateStart={onNavigateStart}
                        onNavigateFinish={onNavigateFinish}
                    >
                        {p}
                    </PageLink>
                )
            )}

            {showPrevNext && (
                <PageLink
                    href={nextHref}
                    disabled={page >= effectiveTotal}
                    className={itemCls(false, page >= effectiveTotal)}
                    onNavigateStart={onNavigateStart}
                    onNavigateFinish={onNavigateFinish}
                >
                    <ChevronRightIcon className="chevron-right-icon" />
                </PageLink>
            )}
        </nav>
    );
}
