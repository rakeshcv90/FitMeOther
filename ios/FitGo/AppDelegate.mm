#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
//#import "RNBootsplash.h"
@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"FitGo";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}
//- (UIView *)createRootViewWithBridge:(RCTBridge *)bridge
//                          moduleName:(NSString *)moduleName
//                           initProps:(NSDictionary *)initProps {
//  UIView *rootView = [super createRootViewWithBridge:bridge
//                                          moduleName:moduleName
//                                           initProps:initProps];
//
//  [RNBootSplash initWithStoryboard:@"BootSplash" rootView:rootView]; // ⬅️ initialize the splash screen
//
//  return rootView;
//}
@end
