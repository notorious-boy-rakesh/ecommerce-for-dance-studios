import React from 'react';

const GlassCard = ({ children, title, subtitle, icon, iconClass, style }) => {
    const hasHeader = title || icon || subtitle;

    return (
        <div className="glass-card" style={style}>
            {hasHeader && (
                <div className="card-header">
                    {icon && <div className={`icon ${iconClass || 'icon-pink'}`}>{icon}</div>}
                    <div>
                        {title && <h2>{title}</h2>}
                        {subtitle && <p>{subtitle}</p>}
                    </div>
                </div>
            )}
            <div className="card-body">
                {children}
            </div>
        </div>
    );
};

export default GlassCard;
