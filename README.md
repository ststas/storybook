# Storybook

This project uses Storybook for component development and documentation.

## Prerequisites

- Node.js 20 or higher
- Docker and Docker Compose
- npm or yarn

## Development

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Start Storybook in development mode:
```bash
npm run storybook
```

Storybook will be available at http://localhost:6006

### Docker Development

1. Build and start the development container:
```bash
docker-compose up storybook-dev
```

This will:
- Build the development Docker image
- Start Storybook in development mode
- Enable hot-reload
- Mount your local files into the container

Storybook will be available at http://localhost:6006

## Production

### Docker Production

1. Build and start the production container:
```bash
docker-compose up storybook-prod
```

This will:
- Build the production Docker image
- Build the static Storybook files
- Start an nginx server to serve the static files
- Enable gzip compression and caching

Storybook will be available at http://localhost:80

### Building for Production

To build the static files locally:
```bash
npm run build-storybook
```

The built files will be in the `storybook-static` directory.

## Docker Commands

### Development
```bash
# Start development environment
docker-compose up storybook-dev

# Start in detached mode
docker-compose up -d storybook-dev

# View logs
docker-compose logs -f storybook-dev

# Stop development environment
docker-compose down
```

### Production
```bash
# Start production environment
docker-compose up storybook-prod

# Start in detached mode
docker-compose up -d storybook-prod

# View logs
docker-compose logs -f storybook-prod

# Stop production environment
docker-compose down
```

## Project Structure

```
storybook/
├── src/
│   └── stories/        # Storybook stories
├── .storybook/         # Storybook configuration
├── Dockerfile          # Production Docker configuration
├── Dockerfile.dev      # Development Docker configuration
├── docker-compose.yml  # Docker Compose configuration
└── nginx.conf         # Nginx configuration for production
```

## Available Scripts

- `npm run storybook` - Start Storybook in development mode
- `npm run build-storybook` - Build static Storybook files
- `npm run build` - Build the project
- `npm run lint` - Run ESLint
- `npm run preview` - Preview the production build

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request
