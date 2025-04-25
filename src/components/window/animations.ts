import { settings } from '@/utils/settings'

export const animations = {
  overlay: {
    leaving: {
      fromProject: {
        opacity: 1,
      },
      fromHome: {
        opacity: [1, 0],
        transition: {
          times: [0.95, 1],
          duration: settings.duration * 2.5,
          ease: settings.easeOut,
        },
      },
    },
    entering: {
      fromProject: {
        opacity: 1,
      },
      fromHome: {
        opacity: [0, 1],
        transition: {
          times: [0, 1],
          duration: settings.duration * 1.5,
          ease: settings.easeIn,
        },
      },
    },
  },
  window: {
    leaving: {
      fromProject: {
        opacity: 1,
        height: '100%',
        width: '100%',
      },
      fromHome: {
        opacity: [1, 1, 1, 0],
        height: ['100%', '0%', '0%', '0%'],
        width: ['100%', '100%', '90%', '90%'],
        transition: {
          times: [0, 0.5, 0.95, 1],
          duration: settings.duration * 2.5,
          ease: settings.easeOut,
        },
      },
    },
    entering: {
      fromProject: {
        opacity: 1,
        height: '100%',
        width: '100%',
      },
      fromHome: {
        opacity: [0, 1, 1],
        height: ['0%', '0%', '100%'],
        width: ['90%', '100%', '100%'],
        transition: {
          times: [0, 0.5, 1],
          duration: settings.duration * 2.5,
          ease: settings.easeIn,
        },
      },
    },
  },
  wrapper: {
    leaving: {
      fromProject: {
        opacity: 0,
        scale: 0.98,
        transition: {
          duration: settings.duration * 0.5,
          ease: settings.easeOut,
        },
      },
      fromHome: {
        opacity: 0,
        transition: {
          duration: settings.duration * 0.5,
          ease: settings.easeOut,
        },
      },
    },
    entering: {
      fromProject: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: settings.duration * 0.5,
          ease: settings.easeOut,
        },
      },
      fromHome: {
        opacity: [0, 0, 1],
        transition: {
          times: [0, 0.95, 1],
          duration: settings.duration * 2.5,
          delay: settings.delay,
          ease: settings.easeIn,
        },
      },
    },
  },
}
