#-----------------------------------------------------------------------------
# OSGi GUI Application Project Tree Template

project(com_plugins_Radar3D)

set(PLUGIN_export_directive "com_plugins_Radar3D_Export")

set(PLUGIN_SRCS
    Radar3DWindowActivator.cpp

    ### Concrete window plugin class
    gui/Radar3DWindowWidgetPlugin.cpp
	
    ### ZMQ
    Radar3DZmqBuilder.cpp
    ${ZMQ_INCLUDE_PATH}/nzmqt/nzmqt.cpp
    ${ZMQ_INCLUDE_PATH}/ZmqDirector.cpp
    ${ZMQ_INCLUDE_PATH}/ZmqObject.cpp
    
    ### User class source
    
)

set(PLUGIN_MOC_SRCS
    Radar3DWindowActivator.h
    
    ### Plugin Interfaces
    ${PLUGIN_INTERFACE_PATH}/ICenterWindow.h
    ${PLUGIN_INTERFACE_PATH}/IPluginInfo.h
    ${PLUGIN_INTERFACE_PATH}/ISettingWindow.h
    ${PLUGIN_INTERFACE_PATH}/IWidgetPlugin.h
    
    ### Concrete window plugin class
    gui/Radar3DWindowWidgetPlugin.h
    
    ### ZMQ
    Radar3DZmqBuilder.h
    ${ZMQ_INCLUDE_PATH}/nzmqt/nzmqt.hpp
    ${ZMQ_INCLUDE_PATH}/ZmqBuilder.h
    ${ZMQ_INCLUDE_PATH}/ZmqDirector.h
    ${ZMQ_INCLUDE_PATH}/ZmqObject.h
    
    ### User class header
    
)

set(PLUGIN_UI_FORMS
    ### User QT UI form
    
)

set(PLUGIN_UI_RCCS
    ### User resource files (*.qrc)
    
)

INCLUDE_DIRECTORIES(
    ${com_plugins_Radar3D_SOURCE_DIR}/gui
    ${com_plugins_Radar3D_INCLUDE_DIRS}
    ${PLUGIN_INTERFACE_PATH}
    ${ZMQ_INCLUDE_PATH}
)

ctkFunctionGetTargetLibraries(PLUGIN_target_libraries)

ctkMacroBuildPlugin(
    NAME ${PROJECT_NAME}
    EXPORT_DIRECTIVE ${PLUGIN_export_directive}
    SRCS ${PLUGIN_SRCS}
    MOC_SRCS ${PLUGIN_MOC_SRCS}
    UI_FORMS ${PLUGIN_UI_FORMS}
    RESOURCES ${PLUGIN_UI_RCCS}
    TARGET_LIBRARIES ${PLUGIN_target_libraries} ${ZMQ_LIBS}
)
if(CTK_QT_VERSION VERSION_GREATER "4")
    qt5_use_modules(com_plugins_radarMonitor Widgets)
endif()
