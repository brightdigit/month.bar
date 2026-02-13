# MonthBar

A macOS MenuBar application that displays the progress of the current month at a glance.

## Overview

**MonthBar** is a native macOS MenuBar app that helps you visualize how much of the current month has passed and how much time remains. Perfect for tracking monthly goals, deadlines, or simply maintaining awareness of time's passage throughout the month.

> **Note:** This is currently a prototype project.

## Features

### Display Modes

- **Icon Styles**
  - **Pie Chart**: Visual pie chart representation showing month completion
  - **Percentage Text**: Simple numeric percentage display

- **Calculation Modes**
  - **All Days**: Calculate progress based on all calendar days in the month
  - **Work Days (Mon-Fri)**: Calculate progress based only on weekdays, excluding weekends

- **Progress Display**
  - **Remaining**: Show how much time is left in the month
  - **Elapsed**: Show how much of the month has passed

### Key Capabilities

- **Real-time Updates**: Progress updates automatically every 60 seconds
- **Accurate Calculations**: Uses millisecond precision for accurate progress tracking
- **MenuBar Integration**: Lives in your MenuBar for constant, unobtrusive visibility
- **Persistent Settings**: Your preferences are saved between app launches

## Technical Details

- **Platform**: macOS
- **Framework**: SwiftUI
- **Architecture**: MVVM pattern with Observable models
- **Requirements**: macOS (specific version TBD)

## Project Structure

```
MonthBar/
├── Models/
│   ├── AppSettings.swift          # Configuration enums and settings
│   └── MonthProgressModel.swift   # Core progress calculation logic
├── Views/
│   ├── MenuBarIconView.swift      # MenuBar icon renderer
│   ├── MonthProgressView.swift    # Progress display view
│   ├── PercentageTextImage.swift  # Percentage text renderer
│   ├── PieChartImage.swift        # Pie chart icon renderer
│   ├── PieChartView.swift         # Pie chart visualization
│   └── SettingsView.swift         # Settings interface
└── Assets.xcassets/               # App assets and icons
```

## Development

Built with modern Swift and SwiftUI, leveraging:
- `@Observable` macro for state management
- `@AppStorage` for persistent user preferences
- MenuBarExtra for native macOS MenuBar integration
- Timer-based auto-updates for real-time progress tracking

## License

Copyright (c) 2026 Leo Dion