import React from 'react'
import s from './info.module.scss'

import { ProjectInfo } from '@/utils/types'

type InfoProps = { info: ProjectInfo }

export const Info: React.FC<InfoProps> = ({ info }) => (
  <div className={s.info}>
    {info.year && (
      <div>
        <h2>When</h2> <p>{info.year}</p>
      </div>
    )}
    {info.role && (
      <div>
        <h2>Role</h2> <p>{info.role}</p>
      </div>
    )}
    {info.stack && (
      <div>
        <h2>Stack</h2> <p>{info.stack}</p>
      </div>
    )}
    {info.collaborators && (
      <div>
        <h2>Collaborators</h2>
        <p>
          {info.collaborators.map((collaborator, i) => (
            <React.Fragment key={i}>
              <a
                href={collaborator.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {collaborator.name}
              </a>
              {i < info.collaborators.length - 1 ? ', ' : ''}
            </React.Fragment>
          ))}
        </p>
      </div>
    )}
  </div>
)
